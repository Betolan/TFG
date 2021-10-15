const data = require('../Environment/Variables');
const requests = require('../Requests/Requests');

const neo4j= require('neo4j-driver');
const { response } = require('express');

async function execPhotogrammetry(body){
  const requestGet = requests.getExecPhotogrammetry(body);
  if (requestGet[0].status == 'OK')
    return { status: "OK" };
  else 
    return { status: "not OK" };
}

async function sendImage(body){
  const requestPost = await requests.postSentImage(body);
  if (requestPost[0].status == 'OK')
    return { status: "OK" };
  else 
    return { status: "not OK" };
}

module.exports = { execPhotogrammetry, sendImage }