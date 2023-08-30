from django.apps import AppConfig


class ProshopConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'proshop'


    def ready(self):
        import proshop.signals
