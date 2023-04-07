from django.contrib.auth.management.commands import createsuperuser
from django.core.management import CommandError
from django.db import DEFAULT_DB_ALIAS

import os

class Command(createsuperuser.Command):
    help = "Create a superuser, and allow password to be provided"


    def handle(self, *args, **options):
        username = os.environ.get('DJANGO_SUPERUSER_USERNAME')
        email = os.environ.get('DJANGO_SUPERUSER_EMAIL')
        password = os.environ.get('DJANGO_SUPERUSER_PASSWORD')

        if not email:
            email = os.environ.get('DJANGO_SUPERUSER_EMAIL')


        if password and not username:
            raise CommandError("--username is required if specifying --password")

        if username:
            exists = (
                self.UserModel._default_manager.db_manager(self._get_database(options))
                .filter(username=username)
                .exists()
            )
            if exists:
                self.stdout.write("User exists, exiting normally due to --preserve")
                return

        super(Command, self).handle(*args, **options)

        if password:
            user = self.UserModel._default_manager.db_manager(self._get_database(options)).get(
                username=username
            )
            user.set_password(password)
            user.save()
            
    def _get_database(self, options):
        return options.get('database', DEFAULT_DB_ALIAS)