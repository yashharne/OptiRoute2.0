import functools

from flask import (
    Blueprint, flash, g, redirect, request, session, url_for , jsonify, Response
)
from werkzeug.security import check_password_hash, generate_password_hash

from server.db import get_db

bp = Blueprint('auth', __name__, url_prefix='/auth')

@bp.route('/register', methods=['POST'])
def register():
    email = request.form['email']
    name = request.form['name']
    password = request.form['password']

    db = get_db()
    error = None

    # Check if email and password are provided
    if not email:
        error = 'Email is required.'
    elif not password:
        error = 'Password is required.'

    if error is None:
        # Check if the email already exists in the database
        existing_user = db.table('users').select('*').eq('email', email).execute().data
        
        # If the user exists, return an error
        if existing_user:
            error = f"User with email {email} is already registered."
            return Response(error, status=400)  # 400 Bad Request for already existing user

        try:
            # Insert new user into the database
            res = db.table("users").insert({
                'email': email,
                'name': name,
                'password': generate_password_hash(password)
            }).execute()

            # Check if the insert was successful
            if res.data:
                return jsonify(res.data), 201  # Return success response with inserted data

        except Exception as e:
            # Catch any exceptions during the insert
            error = f"An error occurred: {str(e)}"
            return Response(error, status=500)  # 500 Internal Server Error

    else:
        return Response(error, status=400)  # 400 Bad Request for invalid input




@bp.route('/login', methods=(['POST']))
def login():
    data = request.get_json()
    print(data)
    email = data.get('email')
    password = data.get('password')
    db = get_db()
    error = None

    # Fetch user from the database based on email
    users = db.table("users").select('*').eq('lower(email)', email).execute().data
    print(f"Database query result: {users}")  # Log database query result

    if not users:  # Check if users list is empty
        error = 'Incorrect email.'
    else:
        user = users[0]  # Get the first user if exists
        if not check_password_hash(user['password'], password):
            error = 'Incorrect password.'

    if error is None:
        session.clear()
        session['user_id'] = user['id']
        return jsonify(user)
    
    return Response(error, status=401)



@bp.before_app_request
def load_logged_in_user():
    user_id = session.get('user_id')
    db = get_db()
    if user_id is None:
        g.user = None
    else:
        g.user = db.table("users").select('*').eq('id' , user_id).execute().data[0]



@bp.route('/logout')
def logout():
    if session.get('user_id') is not None:
        session.clear()
        return Response("Logged Out" , status=200)
    return Response("Login first to log out" , status=400)



def login_required(view):
    @functools.wraps(view)
    def wrapped_view(**kwargs):
        if g.user is None:
            return Response("Unauthorized", status=401)

        return view(**kwargs)

    return wrapped_view



def _corsify_actual_response(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response