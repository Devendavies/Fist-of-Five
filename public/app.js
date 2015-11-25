'use strict';

$(function(){
  console.log('javascript LOADED!');
  // let socket = io();
  let renderSurveyTemplate = Handlebars.compile($('template#surveys').html());
  let renderUserTemplate = Handlebars.compile($('template#userpage').html());
  let signup_loginTemplate = Handlebars.compile($('template#signup-login').html());
  let newSurveyTemplate = Handlebars.compile($('template#newSurveyTemplate').html());

  let renderForm = function(){
    let formTemplate = signup_loginTemplate();
    $('.results').empty().append(formTemplate);
  };

  let getForms = function(){
    $.ajax({
      url: '/',
      type: 'GET',
    }).done(renderForm)
  };

  getForms();

  let renderSurveys = function(data){
    console.log(data);
    data.preventDefault();
    let surveyTemplate = renderSurveyTemplate({surveys: data});
    $('.results').empty().append(surveyTemplate);
  };

  let renderUsers = function(data){
    console.log('render users clicked!')
    console.log(data);
    let userTemplate = renderUserTemplate({user: data});
    $('.results').empty().append(userTemplate);
  };

  let getUsers = function(e){
    e.preventDefault();
    $.ajax({
      url: '/users',
      method: 'GET',
      dataType: 'json'
    }).done(renderUsers)
  };

  let createUser = function(e){
    e.preventDefault();
    alert('User Created! Welcome...')
    // let userData = $(this).closest('form').serialize();
    var userData = {
      name :     $('#new_name').val(),
      password : $('#new_password').val(),
      img_url:   $('#new_profile_pic').val(),
      birthday:  $('#new_birthday').val(),
      bio:       $('#new_bio').val()
    }
    console.log(userData);
    $.ajax({
      url: '/users',
      method: 'POST',
      data: userData,

    }).done();
  };

  let authorize = function(e){
    console.log('login button clicked');
    e.preventDefault();
    var userData = {
      name: $('#login-name').val(),
      password: $('#login-password').val()
    };
    $.ajax({
      url: '/authorization',
      type: 'POST',
      data: userData
    }).done(function(user){
      console.log(user.token);
    });
  };

  let createSurvey = function(e){
    e.preventDefault();
    let topic = $('#new_topic').val();
    console.log($('#new_topic').val()); // Test
    let description = $('#new_description').val();
    $('.results').empty().append(newSurveyTemplate);
    // Set by token id (YIKES)
    // let owner_id = findByToken;
  }

  $('.show_users').on('click', getUsers);
  $('.show_surveys').on('click', renderSurveys);
  $('body').on('click', '#signup_button', createUser);
  $('body').on('click', '#login-button', authorize);
  $('body').on('click', '#new-post', createSurvey);
});
