function httpsGet(theUrl)
{
    var xmlHttps = new XMLHttpRequest();
    xmlHttps.open( "GET", theUrl, false );
    xmlHttps.send( null );
    return xmlHttps.responseText
}


function getClimateInfo(lat,lng) {
  var climateKey = 'fae556fcfe7e4653a3a154935181205'
  var temp = new Array(24), humid = new Array(24)
  var appendMonth1 = '01', appendMonth2 = '02'
  for (month = 1; month < 12; month++) {
    if (month.toString().length == 1)
      appendMonth1 = ' '+month.toString()
    else
      appendMonth1 = month.toString()
    if ((month+1).toString().length == 1)
      appendMonth2 = ' '+(month+1).toString()
    else
      appendMonth2 = (month+1).toString()
    var WWOurl = 'https://api.worldweatheronline.com/premium/v1/past-weather.ashx?q='+lat+','+lng+'&date=2016-'+appendMonth1+'-01&enddate=2016-'+appendMonth2+'-01&includelocation=yes&tp=24&format=json&key='+climateKey
    var WWOresp = httpsGet(WWOurl)
    var WWOobj = JSON.parse(WWOresp)
    var all_days = WWOobj.data.weather
    var humid_sum = 0
    temp[month-1] = new Array()
    for (i = 0; i < all_days.length - 1; i++) {
      temp[month-1].push(+all_days[i].hourly[0].tempC)
      humid_sum += all_days[i].hourly[0].humidity
    }
    humid[month-1] = humid_sum/(all_days.length-1)
  }
  if (true) {  // to make not global
    var WWOurl = 'https://api.worldweatheronline.com/premium/v1/past-weather.ashx?q='+lat+','+lng+'&date=2016-12-01&enddate=2017-01-01&includelocation=yes&tp=24&format=json&key='+climateKey
    var WWOresp = httpsGet(WWOurl)
    var WWOobj = JSON.parse(WWOresp)
    var all_days = WWOobj.data.weather
    temp[11] = new Array()
    var humid_sum = 0
    for (i = 0; i < all_days.length - 1; i++) {
      temp[11].push(+all_days[i].hourly[0].tempC)
      humid_sum += all_days[i].hourly[0].humidity
    }
    humid[11] = humid_sum/(all_days.length-1)
    }

    if (true) {  // to make not global
      var WWOurl = 'https://api.worldweatheronline.com/premium/v1/past-weather.ashx?q='+lat+','+lng+'&date=2017-01-01&enddate=2017-02-01&includelocation=yes&tp=24&format=json&key='+climateKey
      var WWOresp = httpsGet(WWOurl)
      var WWOobj = JSON.parse(WWOresp)
      var all_days = WWOobj.data.weather
      temp[12] = new Array()
      var humid_sum = 0
      for (i = 0; i < all_days.length - 1; i++) {
        temp[12].push(+all_days[i].hourly[0].tempC)
        humid_sum += all_days[i].hourly[0].humidity
      }
      humid[12] = humid_sum/(all_days.length-1)
      }
  for (month = 1; month < 11; month++) {
    if (month.toString().length == 1)
      appendMonth1 = ' '+month.toString()
    else
      appendMonth1 = month.toString()
    if ((month+1).toString().length == 1)
      appendMonth2 = ' '+(month+1).toString()
    else
      appendMonth2 = (month+1).toString()
    var WWOurl = 'https://api.worldweatheronline.com/premium/v1/past-weather.ashx?q='+lat+','+lng+'&date=2017-'+appendMonth1+'-01&enddate=2017-'+appendMonth2+'-01&includelocation=yes&tp=24&format=json&key='+climateKey
    var WWOresp = httpsGet(WWOurl)
    var WWOobj = JSON.parse(WWOresp)
    var all_days = WWOobj.data.weather
    temp[month+12] = new Array()
    var humid_sum = 0
    for (i = 0; i < all_days.length - 1; i++) {
      temp[month+12].push(+all_days[i].hourly[0].tempC)
      humid_sum += all_days[i].hourly[0].humidity
    }
    humid[month+12] = humid_sum/(all_days.length-1)
  }
  if (true) {  // to make not global
    var WWOurl = 'https://api.worldweatheronline.com/premium/v1/past-weather.ashx?q='+lat+','+lng+'&date=2017-12-01&enddate=2018-01-01&includelocation=yes&tp=24&format=json&key='+climateKey
    var WWOresp = httpsGet(WWOurl)
    var WWOobj = JSON.parse(WWOresp)
    var all_days = WWOobj.data.weather
    temp[23] = new Array()
    var humid_sum = 0
    for (i = 0; i < all_days.length - 1; i++) {
      temp[23].push(+all_days[i].hourly[0].tempC)
      humid_sum += all_days[i].hourly[0].humidity
    }
    humid[23] = humid_sum/(all_days.length-1)
    }
  var max_temp = -100, min_temp = 100
  for (i=0; i<temp.length; i++) {
    for (j=0; j<temp[i].length; j++) {
      if (temp[i][j]>max_temp)
        max_temp=temp[i][j]
      if (temp[i][j]<min_temp)
        min_temp=temp[i][j]
    }
  }
  var packed_object = new Object()
  packed_object.temperatures = temp
  packed_object.humidity = humid
  packed_object.max_temperature = max_temp
  packed_object.min_temperature = min_temp
  var packed_json = JSON.stringify(packed_object)
  console.log(packed_json)
  return packed_json
}
