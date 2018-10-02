$env:FLASK_APP = "application.py"
$env:FLASK_DEBUG = "1"
flask run

set FLASK_DEBUG=1
set FLASK_APP=application.py
flask run