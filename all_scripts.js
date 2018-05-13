function httpsGet(theUrl)
{
    var xmlHttps = new XMLHttpRequest();
    xmlHttps.open( "GET", theUrl, false );
    xmlHttps.send( null );
    return xmlHttps.responseText
}


function getClimateInfo(lat,lng) {
  var climateKey = '818f68983c2a4e04b09131513181305'
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
  packed_object = new Object()
  packed_object.temperatures = temp
  packed_object.humidity = humid
  packed_object.max_temperature = max_temp
  packed_object.min_temperature = min_temp
  var packed_json = JSON.stringify(packed_object)
  //return packed_json
  return packed_object
}

var climateInfo
function checkCultures(lat,lng) {
  climateInfo = getClimateInfo(lat,lng)
  var cultures = new Object()
  cultures['Ячмень'] = [-6,12,20, 960, 1450, 0]
  cultures['Гречиха'] = [-1, 12, 20, 1200, 1400, 0]
  cultures['Кукуруза'] = [-2, 16, 23, 1100, 2900, 0]
  cultures['Рис'] = [0, 20, 27, 2200, 2800, 0]
  cultures['Рожь озимая'] = [-20, 12, 20, 1200, 1500, 0]
  cultures['Пшеница озимая'] = [-10, 12, 20, 1400, 1500, 0]
  cultures['Подсолнечник'] = [-4, 15, 23, 2000, 2300, 0]
  cultures['Свекла сахарная'] = [-4, 12, 20, 2200, 2550, 0]
  cultures['Картофель'] = [-2, 14, 18, 1200, 1800, 0]
  cultures['Арбуз и дыня'] = [0, 20, 27, 2000, 3000, 0]
  var act_temp_sum = 0, min_temp1 = 100, sum_temp = 0
  for (i=5; i<8; i++){
    for (j=0; j<climateInfo.temperatures[i].length; j++){
      if (climateInfo.temperatures[i][j]-10>0){
        act_temp_sum+=climateInfo.temperatures[i][j]-10
      }
      if (climateInfo.temperatures[i][j]<min_temp){
        min_temp=climateInfo.temperatures[i][j]
      }
      sum_temp+=climateInfo.temperatures[i][j]
    }
  }
  var min_temp2 = 100
  for (i=17; i<20; i++){
    for (j=0; j<climateInfo.temperatures[i].length; j++){
      if (climateInfo.temperatures[i][j]-10>0){
        act_temp_sum+=climateInfo.temperatures[i][j]-10
      }
      if (climateInfo.temperatures[i][j]<min_temp){
        min_temp=climateInfo.temperatures[i][j]
      }
      sum_temp+=climateInfo.temperatures[i][j]
    }
  }
  act_temp_sum=act_temp_sum/2
  var aver_temp = sum_temp/184
  var min_temp = (min_temp1+min_temp2)/2
  for (culture in cultures) {
      if (min_temp < cultures[culture][0]){
        cultures[culture][5] -= (cultures[culture][0] - min_temp)*0.5
      }
      if (aver_temp < cultures[culture][1]){
        cultures[culture][5] -=  (aver_temp - cultures.culture[1])*0.5
      }
      if (aver_temp > cultures[culture][2]){
        cultures[culture][5] -= (aver_temp - cultures[culture][2])*0.5
      }
      if (act_temp_sum < cultures[culture][3]){
        cultures[culture][5] -= ((cultures[culture][3] - act_temp_sum)/100)*0.5
      }
      if (act_temp_sum > cultures[culture][4]){
        cultures[culture][5] -= ((act_temp_sum - cultures[culture][4])/100)*0.5
      }
    good_cultures = []
    for (culture in cultures) {
        good_cultures.push([culture,cultures[culture][5]])
    }
  }
  return good_cultures
}



function globalCulturesCheck(lat,lng) {
  var culturesChecked = checkCultures(lat,lng)
  var culturesSoils = getGoodCultures(lat,lng)
  var res = {}
  for (cultureNum in culturesChecked){
    var sum = culturesChecked[cultureNum][1]+culturesSoils[culturesChecked[cultureNum][0]][2]
    res[culturesChecked[cultureNum][0]] = sum
  }
  var max = -100,max_name = ''
  for (r in res){
    if (res[r]>max){
      max=res[r]
      max_name=r
    }
  }
  if (max<6){
    max = 6
  }
  var good = [], bad = []
  for (r in res){
    res[r]=(res[r])/max*100
      if (res[r]>=55){
        good.push(r)
      }
      else{
        bad.push(r)
      }
  }
  return {'max_val': res[max_name], 'max_name': max_name, 'good_cultures': good, 'bad_cultures': bad}
}

function get(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}
String.prototype.format = function() {
    var res = this;
    for (i = 0; i < arguments.length; i++) {
        res = res.replace('{' + i + '}', arguments[i].toString());
    }
    return res;
}
function getProperties(lat, lon){
    var ans = JSON.parse(get('https://rest.soilgrids.org/query?lon={0}&lat={1}&attributes=TAXNWRB,PHIHOX'.format(lon, lat)));
    return ans['properties'];
}
function soilCompare(a, b) {
	if (a.part < b.part)
		return 1;
	if (a.part > b.part)
		return -1;
	return 0;
}
function getSoilInfo(lat, lon, lim=5){
    var props = getProperties(lat, lon);
    var soil_dict = props['TAXNWRB'];
    var soils = new Array();
    for (soil in soil_dict) {
        soils.push({name:soil, part:soil_dict[soil]});
    }
    soils = soils.sort(soilCompare);
    res_soils = [];
    for (i = 0; (i < soils.length) && (soils[i].part >= lim); i++)
      res_soils.push(soils[i])
    for (i in props['PHIHOX']['M']) {
        var acidity = props['PHIHOX']['M'][i];
        break;
    }
    return {'acidity':acidity, 'soils':res_soils};
}

var allplus = 0, wheat = 0, rice = 0, melon = 0, winter = 0, maize = 0
function changesWithSoils(soilName){
  var s = soilName.toLowerCase()
  if (s.includes('histosol')){
    allplus-=0.7
  }

  if (s.includes('andosol')){
    rice+=2
    maize+=1
  }

  if (s.includes('arenosols')){
    melon+=1
    maize+=1
  }

  if (s.includes('vertisols')){
    allplus-=0.3
  }

  if (s.includes('fluvisols')){
    winter+=1.5
    maize+=1.5
    melon+=1.5
  }

  if (s.includes('gleysols')){
    rice+=2.5
    allplus-=0.5
  }

  if (s.includes('leptosols')){
    //nothing
  }

  if (s.includes('regosols')){
    wheat+=1.3
    rice+=1.3
    maize+=1.3
  }

  if (s.includes('cambisols')){
    allplus+=1.5
  }

  if (s.includes('solonchaks')){
    allplus-=1.7
  }

  if (s.includes('solonetz')){
    allplus-=1.6
  }

  if (s.includes('gypsisols')){
    allplus+=0.5
  }

  if (s.includes('calcisols')){
    allplus+=0.5
  }

  if (s.includes('kastanozems')){
    allplus+=1
  }

  if (s.includes('chernozems')){
    allplus+=2
  }

  if (s.includes('phaeozems')){
    wheat+=1
  }

  if (s.includes('luvisols')){
    allplus+=1
  }

  if (s.includes('podzols')){
    allplus+=1
  }

}



function getGoodCultures(lat,lon) {
  var cultures = new Object()
  cultures['Ячмень'] = [6.0 , 7.5, 0]
  cultures['Гречиха'] = [4.7 , 7.5, 0]
  cultures['Кукуруза'] = [6.0 , 7.5, 0]
  cultures['Рис'] = [5.0 , 6.6, 0]
  cultures['Рожь озимая'] = [5.0 , 7.7, 0]
  cultures['Пшеница озимая'] = [6.3 , 7.5, 0]
  cultures['Подсолнечник'] = [6.0 , 6.8, 0]
  cultures['Свекла сахарная'] = [7.0 , 7.5, 0]
  cultures['Картофель'] = [4.5 , 6.3, 0]
  cultures['Арбуз и дыня'] = [4.0 , 5.5, 0]
  var addToAll = 0
  var soils = getSoilInfo(lat,lon)
  for (soilNum in soils['soils']) {
    changesWithSoils(soils['soils'][soilNum]['name'])
    if (soils['soils'][soilNum]['part']>=40){
      allplus*=2
      wheat*=2
      winter*=2
      rice*=2
      melon*=2
      maize*=2
    }
    cultures['Ячмень'][2]+=allplus+wheat
    cultures['Гречиха'][2]+=allplus+wheat
    cultures['Кукуруза'][2]+=allplus+maize
    cultures['Рис'][2]+=allplus+rice
    cultures['Рожь озимая'][2]+=allplus+winter
    cultures['Пшеница озимая'][2]+=allplus+winter
    cultures['Подсолнечник'][2]+=allplus+wheat
    cultures['Свекла сахарная'][2]+=allplus+maize
    cultures['Картофель'][2]+=allplus+maize
    cultures['Арбуз и дыня'][2]+=allplus+melon
    allplus = 0, wheat = 0, rice = 0, melon = 0, winter = 0, maize = 0
  }
  for (culture in cultures) {
    if (cultures[culture][0] <= soils['acidity'] && soils['acidity'] <= cultures[culture][1]){
      cultures[culture][2]+=1.5
    }
  }
  return cultures
}
