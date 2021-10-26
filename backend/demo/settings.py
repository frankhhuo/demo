"""
Django settings for demo project.

Generated by 'django-admin startproject' using Django 3.2.5.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.2/ref/settings/
"""
import os
from pathlib import Path
import json

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent
with open(os.path.join(BASE_DIR, "demo/", "config.json"), "r") as config_file:

    CONFIG = json.load(config_file)

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = CONFIG["SECRET_KEY"]

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = [
    "127.0.0.1",
    "localhost",
    "192.168.0.250",
]


# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "todo",
    "accounts",
    "sslserver",
    "allauth.account",
    "django.contrib.sites",
    "corsheaders",
    "rest_framework",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "corsheaders.middleware.CorsMiddleware",
]
REST_FRAMEWORK = {
    "DEFAULT_PERMISSION_CLASSES": ("rest_framework.permissions.IsAuthenticated",),
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
        "rest_framework.authentication.SessionAuthentication",
        "rest_framework.authentication.BasicAuthentication",
    ),
    "EXCEPTION_HANDLER": "rest_framework.views.exception_handler",
}


CORS_ORIGIN_WHITELIST = [
    "http://127.0.0.1:3000",
    "http://127.0.0.1:5000",
    "http://localhost:3000",
    "http://localhost:5000",
]
ROOT_URLCONF = "demo.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [os.path.join(BASE_DIR, "templates/")],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

JWT_AUTH = {"JWT_RESPONSE_PAYLOAD_HANDLER": "demo.utils.my_jwt_response_handler"}
WSGI_APPLICATION = "demo.wsgi.application"
from datetime import timedelta

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(days=7),
}

# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
        "ATOMIC_REQUESTS": True,
    }
}


# Password validation
# https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.2/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_L10N = True

USE_TZ = True

STATIC_URL = "/static/"

STATIC_ROOT = os.path.join(BASE_DIR, "static/")
STATICFILES_DIRS = (
    ("css", os.path.join(STATIC_ROOT, "css").replace("\\", "/")),
    ("images", os.path.join(STATIC_ROOT, "images").replace("\\", "/")),
)


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.2/howto/static-files/

# Default primary key field type
# https://docs.djangoproject.com/en/3.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

MEDIA_ROOT = os.path.join(BASE_DIR, "media")
MEDIA_URL = "/media/"
AUTHENTICATION_BACKENDS = (
    "allauth.account.auth_backends.AuthenticationBackend",
    "django.contrib.auth.backends.ModelBackend",
)
SOCIALACCOUNT_PROVIDERS = {
    "google": {
        "SCOPE": [
            "profile",
            "email",
        ],
        "AUTH_PARAMS": {
            "access_type": "online",
        },
    },
    "qq": {
        "SCOPE": [
            "get_user_info",
        ],
        "AUTH_PARAMS": {
            "access_type": "online",
            "response_type": "code",
            "redirect_uri": "https://www.bigmaples.com/accounts/qq/login/callback",
            "client_id": "101878540",
            #'state':'test12345',
        },
    },
}
SITE_ID = 1
LOGIN_REDIRECT_URL = "/"

GOOGLE_OAUTH_CLIENT_ID = CONFIG["google_oauth_client_id"]
GOOGLE_OAUTH_CLIENT_SECRET = CONFIG["google_oauth_client_secret"]


QQ_OAUTH_CLIENT_ID = CONFIG["QQ_OAUTH_CLIENT_ID"]
QQ_OAUTH_CLIENT_SECRET = CONFIG["QQ_OAUTH_CLIENT_SECRET"]
# SOCIAL_AUTH_GOOGLE_OAUTH2_KEY = GOOGLE_OAUTH_CLIENT_ID
# SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET = GOOGLE_OAUTH_CLIENT_SECRET
# SOCIAL_AUTH_QQ_OAUTH2_KEY = QQ_OAUTH_CLIENT_ID
# SOCIAL_AUTH_QQ_OAUTH2_SECRET = QQ_OAUTH_CLIENT_SECRET

SOCIAL_AUTH_LOGIN_REDIRECT_URL = "/"
LOGIN_URL = "/accounts/login/"
ACCOUNT_DEFAULT_HTTP_PROTOCOL = "https"

LOGIN_REDIRECT_URL = "/"
LOGOUT_REDIRECT_URL = "/"

# Google recaptcha keys
GRECAPTCHA_SITE_KEY = CONFIG["GRECAPTCHA_SITE_KEY"]

GRECAPTCHA_SECRET_KEY = CONFIG["GRECAPTCHA_SECRET_KEY"]

# Email
EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = "smtp.gmail.com"
EMAIL_PORT = "587"
EMAIL_HOST_USER = "frank.h.huo@gmail.com"
EMAIL_HOST_PASSWORD = "Xiaohushi2016"
EMAIL_USE_TLS = True
EMAIL_USE_SSL = False
