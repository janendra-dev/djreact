from django.http import HttpResponse
from django.shortcuts import redirect
#  for any   authen user stay in accessable page
def unauthenticated_user(view_fun):
	def wrapper_fun(request,*args,**kwargs):
		if request.user.is_authenticated:
			return redirect('home')

		else:
			return view_fun(request, *args, **kwargs)
			# goto loginPage if unauthenticated login view_fun grap loginPage and register
	return wrapper_fun

# admin page access allow or not after login
def allowed_user(allowed_roles=[]):
	def decorator(view_fun):
		def wrapper_fun(request,*args,**kwargs):
			group=None
			if request.user.groups.exists():
				group=request.user.groups.all()[0].name
				# print(allowed_roles)
				if group in allowed_roles:
					return view_fun(request, *args, **kwargs)
				else:
					return HttpResponse('not allowed_user')
		return wrapper_fun
	return decorator


# switching user acces as either admin=home or customer=userpage at login
def admin_only(view_fun):
		def wrapper_fun(request,*args,**kwargs):
			group=None
			if request.user.groups.exists():
				group=request.user.groups.all()[0].name
				# print(allowed_roles)
				if group=='admin':
					return view_fun(request, *args, **kwargs)
				else:
					return redirect('user_page')
		return wrapper_fun	