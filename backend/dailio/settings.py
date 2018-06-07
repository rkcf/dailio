"""
Django settings for dailio project.
"""

import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

SECRET_KEY = os.environ['DJANGO_SECRET_KEY']

DEBUG = bool(os.environ['DJANGO_DEBUG'])

ALLOWED_HOSTS = ['*']

# Applications

INSTALLED_APPS = [
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'webpack_loader',
    'rest_framework.authtoken',
    'rest_auth',
    'accounts',
    'api'
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'dailio.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            os.path.join(BASE_DIR, 'templates'),
        ],
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'dailio.wsgi.application'

# Database

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, './db/db.sqlite3'),
    }
}


# Password validation

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.BasicAuthentication',
        'rest_framework.authentication.TokenAuthentication',
    )
}

# Internationalization

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

# Static files

STATIC_URL = '/static/'

# Webpack Loader
if DEBUG:
    WEBPACK_LOADER = {
            'DEFAULT': {
                'BUNDLE_DIR_NAME': '',
                'STATS_FILE': os.path.join(BASE_DIR, '../frontend/webpack-stats.json'),
            }
    }
    STATICFILES_DIRS = (
        os.path.join(BASE_DIR, '../frontend/webpack-stats.json'),
        os.path.join(BASE_DIR, './static'),
    )
else:
    WEBPACK_LOADER = {
            'DEFAULT': {
                'BUNDLE_DIR_NAME': '',
                'STATS_FILE': os.path.join(BASE_DIR, '../webpack-stats.json'),
            }
    }
    STATICFILES_DIRS = (
        os.path.join(BASE_DIR, '../webpack-static'),
        os.path.join(BASE_DIR, './static'),
    )
    STATIC_ROOT = '/var/www/static/'
