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
    e.preventDefault();
     let name = $('#new_name').val();
     console.log($('#new_name').val()); // Test
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

   let createSurvey = function(e){
     e.preventDefault();
     let topic = $('#new_topic').val();
     console.log($('#new_topic').val()); // Test
     let description = $('#new_description').val();
     // Set by token id (YIKES)
     // let owner_id = findByToken;
   }

  $('.show_users').on('click', getUsers);
  $('#signup_button').on('click', createUser);
//  $('#signup_button').on('click', createUser(req.body));
  $('.show_surveys').on('click', renderSurveys);
  $('#create-survey').on('click', createSurvey);
