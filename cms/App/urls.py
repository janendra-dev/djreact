from django.urls import path
from . import views
from django.contrib.auth import views as auth_views

urlpatterns=[
path('register/',views.register,name='register'),
path('login/',views.loginPage,name='login'),
path('logout/',views.logoutPage,name='logout'),

path('',views.home,name='home'),
path('user/',views.userPage, name='user_page'),
path('accountset/',views.accountSetting, name='accountset'),

path('product/', views.products,name="product"),
path('customer/<str:cid>/', views.customer,name="customer"),

path('create_order/<str:cid>/',views.createOrder,name='create_order'),
path('update_order/<str:oid>/',views.updateOrder,name='update_order'),
path('delete_order/<str:oid>/',views.deleteOrder,name='delete_order'),

# submit email form
path('reset_password/',
 auth_views.PasswordResetView.as_view(template_name='accounts/password_reset.html'), 
 name='reset_password'),

# sucess message
path('password_reset_sent/', 
	auth_views.PasswordResetDoneView.as_view(template_name='accounts/password_reset_sent.html'), 
	name='password_reset_done'),

# link for confirm
path('reset/<uidb64>/<token>/',
 auth_views.PasswordResetConfirmView.as_view(template_name='accounts/password_reset_confirm.html'), 
 name='password_reset_confirm'),

# password successful
path('password_reset_complete/', 
	auth_views.PasswordResetCompleteView.as_view(template_name='accounts/password_reset_done.html'), 
	name='password_reset_complete'),


]