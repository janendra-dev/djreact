from django.shortcuts import render,redirect
from django.forms import inlineformset_factory
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import Group
from django.contrib import messages

from django.http import HttpResponse
from .filter import OrderFilter
from .models import *
from .forms import OrderForm,CreateUserForm,CustomerForm
from.decorator import unauthenticated_user,allowed_user,admin_only
# Create your views here.
@unauthenticated_user
def register(request):
		form=CreateUserForm()		
		if request.method=='POST':
			form=CreateUserForm(request.POST)
			if form.is_valid():
				userdata=form.save()
				# 	# automatically add customer group for new user
				# group=Group.objects.get(name='customer')
				# userdata.groups.add(group)
				# # automatically create new user to customer
				# Customer.objects.create(
				# 	user=userdata,
				# 	)
				# account created message
				username=form.cleaned_data.get('username')
				messages.success(request,'Account is created for '+username)
				return redirect('login')

		context={'form':form}
		return render(request,'accounts/register.html',context)

@unauthenticated_user
def loginPage(request):	
	if request.method=='POST':
		# from template name attribute
		username=request.POST.get('username')
		password=request.POST.get('password')
		authen=authenticate(request,username=username,password=password)
		if authen is not None:
			login(request,authen)
			return redirect('home')
		else:
			messages.info(request,'Username Or password is incorrect')	

	return render(request,'accounts/login.html')

def logoutPage(request):
	logout(request)
	return redirect('login')

@login_required(login_url='login')
@allowed_user(allowed_roles=['customer'])
def userPage(request):
	order=request.user.customer.order_set.all()
	total_order=order.count()
	pending=order.filter(status='Pending').count()
	delivered=order.filter(status='Delivered').count()
	context={'orders':order, 'total_order':total_order,
	'pending':pending,'delivered':delivered}
	return render(request,'accounts/user.html',context)



@login_required(login_url='login')
@allowed_user(allowed_roles=['customer'])
def accountSetting(request):
	# user=request.user
	customer=request.user.customer
	form=CustomerForm(instance=customer)
	if request.method=='POST':
		form=CustomerForm(request.POST,request.FILES,instance=customer)
	if form.is_valid():
		form.save()

	context={'form':form}
	return render(request,'accounts/accountsetting.html',context)


@login_required(login_url='login')
@admin_only
def home(request):
	order=Order.objects.all()
	customer=Customer.objects.all()
	total_order=order.count()
	pending=order.filter(status='Pending').count()
	delivered=order.filter(status='Delivered').count()
	context={'orders':order, 'customers':customer,'total_order':total_order,
	'pending':pending,'delivered':delivered}
	return render(request,'accounts/dashboard.html',context)

@login_required(login_url='login')
@allowed_user(allowed_roles=['admin'])
def products(request):
	product=Product.objects.all()
	return render(request,'accounts/products.html',{'products':product})

@login_required(login_url='login')
@allowed_user(allowed_roles=['admin'])
def customer(request,cid):
	customer=Customer.objects.get(id=cid)
	# Qs=parent.childmodel_set.all()
	orders=customer.order_set.all()
	order_count=orders.count()
	# searching orders for request
	orderfilter=OrderFilter(request.GET,queryset=orders)
	# displaying filtered data
	orders=orderfilter.qs

	text={'customers':customer, 'orders':orders,'order_count':order_count,'filter':orderfilter}
	return render(request, 'accounts/customers.html', text)

@login_required(login_url='login')
@allowed_user(allowed_roles=['admin'])
def createOrder(request,cid):
	OrderFormSet=inlineformset_factory(Customer,Order,fields=('product','status'),extra=10)
	customer=Customer.objects.get(id=cid)
	formset=OrderFormSet(queryset=Order.objects.none(),instance=customer)
	#formset with current customer making null
	#form=OrderForm(request.POST) #object with new data
	if request.method=='POST':
		formset=OrderFormSet(request.POST,instance=customer)
		#new order data for current customer
		if formset.is_valid():
			formset.save()
			return redirect('/')
	context={'formset':formset}#dict
	return render(request,'accounts/create_order.html',context)

@login_required(login_url='login')
@allowed_user(allowed_roles=['admin'])
def updateOrder(request,oid):
	order=Order.objects.get(id=oid)
	form=OrderForm(instance=order)# object with current field(instance) data
	if request.method=="POST":
		# print(request.POST)
		form=OrderForm(request.POST,instance=order) #object with new data for current fields
		if form.is_valid():
			form.save()
			return redirect('/')
	context={'forms':form}#dict
	return render(request,'accounts/update_order.html',context)

@login_required(login_url='login')
@allowed_user(allowed_roles=['admin'])
def deleteOrder(request,oid):
	order=Order.objects.get(id=oid)
	if request.method=="POST":
			order.delete()
			return redirect('/')
	context={'item':order}#dict
	return render(request,'accounts/delete.html',context)