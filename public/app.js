'use strict';

$(function(){
  console.log('javascript LOADED!');

  let renderSurveyTemplate = Handlebars.compile($('template#surveys').html());
  let renderUserTemplate = Handlebars.compile($('template#userpage').html());


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

  let getUsers = function(){
    $.ajax({
      url: '/users',
      method: 'GET',
      dataType: 'json'
    }).done(renderUsers)
  };

  $('.show_users').on('click', getUsers);
  $('.show_surveys').on('click', renderSurveys);









});
