from django.db.models.signals import post_save
from django.contrib.auth.models import User,Group
from .models import Customer

def customer_profile(sender,instance, created, **kwargs):
	if created:
			# automatically add customer group for new user
				group=Group.objects.get(name='customer')
				instance.groups.add(group)
				# automatically create new user to customer
				Customer.objects.create(
					user=instance,
					name=instance.username,
					)
post_save.connect(customer_profile, sender=User)				
# created	True
# instance	<User: sagar>
# kwargs	 {'raw': False,
#  'signal': <django.db.models.signals.ModelSignal object at 0x000001B44F03D760>,
#  'update_fields': None,
#  'using': 'default'}
# sender <class 'django.contrib.auth.models.User'>

# def customer_profileupdate(sender,instance, created, **kwargs):
# 	if created==False:
# 			instance.customer.save()
# 			print('update_fields')
# post_save.connect(customer_profileupdate, sender=User)	