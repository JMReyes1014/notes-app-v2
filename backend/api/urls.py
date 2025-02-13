from django.urls import path
from . import views

urlpatterns = [
    path("notes/", views.NoteListCreate.as_view(), name="note-list-create"),
    path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name="note-delete"),
    path("notes/edit/<int:pk>/", views.EditNoteView.as_view(), name="note-edit"),
    path('user/', views.userDetail.as_view(), name='user-detail'),
]