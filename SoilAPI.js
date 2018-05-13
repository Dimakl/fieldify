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
  console.log(cultures)
  return cultures
}
