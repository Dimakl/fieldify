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
  console.log(good_cultures)
  return good_cultures
}



function globalCulturesCheck(lat,lng) {
  var culturesChecked = checkCultures(lat,lng)
  var culturesSoils = getGoodCultures(lat,lng)
  var res = {}
  for (cultureNum in culturesChecked){
    var sum = culturesChecked[cultureNum][1]+culturesSoils[culturesChecked[cultureNum][0]][2]
    res.culturesChecked[cultureNum][0] = sum
  }
  return res
}
