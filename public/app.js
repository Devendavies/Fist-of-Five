'use strict';

$(function(){
  console.log('javascript LOADED!');
  // let socket = io();
  let renderSurveyTemplate = Handlebars.compile($('template#surveys').html());
  let renderUserTemplate = Handlebars.compile($('template#userpage').html());
  let signup_loginTemplate = Handlebars.compile($('template#signup-login').html());


  let renderForm = function(){
    let formTemplate = signup_loginTemplate();
    $('.results').empty().append(formTemplate);
  };

  let getForms = function(){
    $.ajax({
      url: '/',
      method: 'GET',
    }).done(renderForm)
  };


  window.onload = getForms();


  let renderSurveys = function(data){
    console.log(data);
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
    console.log('button clicked');
    e.preventDefault();
    let name = $('#new_name').val();
    console.log('in here! HELP');
    // console.log($('#new_name').val());
    let password = $('#new_password').val();
    let img_url = $('#new_profile_pic').val();
    let birthday = $('#new_birthday').val();
    let bio = $('#new_bio').val();
    let userData = {
      name: name,
      password: password,
      img_url: img_url,
      birthday: birthday,
      bio: bio
    }
    console.log(userData);
    $.ajax({
      url: '/users',
      method: 'POST',
      data: userData,
    }).done(renderUsers)
  };

  $('.show_users').on('click', getUsers);
  $('.show_surveys').on('click', renderSurveys);
  $('#signup_button').on('click', createUser());









});
