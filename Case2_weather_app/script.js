$(document).ready(function() {  //一旦畫面布置OK 就執行全部程式
	var init_present_location_YN = 1;  //get present location city and weather when APP initiates default, 0: No, 1: Yes
	
    //選擇縣市 select city button function .btn_city_select
    $(".btn_city_select").click(function(){
		var city_select = $(this).text();
		getTaiwanWeather(city_select);
        $(".collapse").collapse("hide");  // hide collapse 收起
    });
	

	
	function getTaiwanWeather(city_name) {
		
		
		//要用全世界的話 不能用中央氣象局的api 要換成yahoo weather api 才能用成全世界的 
		//developer.yahoo.com/weather/documentation.html
		
		//Weather Forecast Open Data API
		var Your_Weather_API_key = "CWB-DF9C065C-4BE1-4E19-85B6-3496DF3DA85D";  //IMPORTANT, replace it with your weather API Authkey 中央氣象局授權碼
		//中央氣象局 F-C0032-001 一般天氣預報-今明 36 小時天氣預報資料 API 全部縣市
		var url_all = "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-065?Authorization=" + Your_Weather_API_key + "&format=JSON";
		//中央氣象局 F-C0032-001 一般天氣預報-今明 36 小時天氣預報資料 API by 縣市
		var url_city = "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-065?Authorization=" + Your_Weather_API_key + "&format=JSON&locationName=";
		
		
		var jqxhr = $.getJSON(url_city + city_name, function() {
			// console.log("Get Taiwan weather success.");
		})
		.done(function(arr) {
			console.log("The second success.");
			// var outStr = JSON.stringify(arr);
			
			$("#city").text(city_name);
			
			var time_new1 = arr.records.locations[0].location[0].weatherElement[0].time[0].startTime.substr(5,8).replace("-","/") + "時";
			var time_new2 = arr.records.locations[0].location[0].weatherElement[0].time[1].startTime.substr(5,8).replace("-","/") + "時";
			var time_new3 = arr.records.locations[0].location[0].weatherElement[0].time[2].startTime.substr(5,8).replace("-","/") + "時";
			var time_new4 = arr.records.locations[0].location[0].weatherElement[0].time[3].startTime.substr(5,8).replace("-","/") + "時";
			var time_new5 = arr.records.locations[0].location[0].weatherElement[0].time[4].startTime.substr(5,8).replace("-","/") + "時";
			var time_new6 = arr.records.locations[0].location[0].weatherElement[0].time[5].startTime.substr(5,8).replace("-","/") + "時";

			//主時間 Day 2, 3, 4 時間資料 #date, #day2, day3, day4
			
			$("#date").text(time_new1.substr(0,5));
			$("#day2").text(time_new1);
			$("#day3").text(time_new2);
			$("#day4").text(time_new3);
			$("#day5").text(time_new4);
			$("#day6").text(time_new5);
			$("#day7").text(time_new6);
			
			
			
			
			
			//天氣概況 #weather-description
			var weather_1 = arr.records.locations[0].location[0].weatherElement[1].time[0].elementValue[0].value;
			$("#weather-description").text(weather_1);

			
			var weather_value_1 = arr.records.locations[0].location[0].weatherElement[1].time[0].elementValue[1].value;
			var weather_value_2 = arr.records.locations[0].location[0].weatherElement[1].time[4].elementValue[1].value;
			var weather_value_3 = arr.records.locations[0].location[0].weatherElement[1].time[8].elementValue[1].value;
			var weather_value_4 = arr.records.locations[0].location[0].weatherElement[1].time[12].elementValue[1].value;
			var weather_value_5 = arr.records.locations[0].location[0].weatherElement[1].time[16].elementValue[1].value;
			var weather_value_6 = arr.records.locations[0].location[0].weatherElement[1].time[20].elementValue[1].value;
			
			
			//skycons.set("weather-icon", icon); https://github.com/darkskyapp/skycons {"clear-day", "clear-night", "partly-cloudy-day", "partly-cloudy-night", "cloudy", "rain", "sleet", "snow", "wind", "fog"}
			//Use dictionary to map weather icon (ForecastElement.PDF)
			var weather_dict = {01:"clear-day",02:"partly-cloudy-day",03:"partly-cloudy-day",04:"partly-cloudy-day",05:"cloudy",06:"cloudy",07:"cloudy",08:"rain",09:"rain"};
			//上面這一段是改根據氣候改圖案的
			
			// console.log(weather_value_1,weather_value_2,weather_value_3);
			var skycons = new Skycons({"color": "#A9DD9B"});
			skycons.set("weather-icon", weather_dict[weather_value_1]);
			skycons.set("weather-icon-day2", weather_dict[weather_value_1]);
			skycons.set("weather-icon-day3", weather_dict[weather_value_2]);
			skycons.set("weather-icon-day4", weather_dict[weather_value_3]);
			skycons.set("weather-icon-day5", weather_dict[weather_value_4]);
			skycons.set("weather-icon-day6", weather_dict[weather_value_5]);
			skycons.set("weather-icon-day7", weather_dict[weather_value_6]);
			skycons.play();
			
			
			
			//舒適度 #feels-like
			var fl_1 = arr.records.locations[0].location[0].weatherElement[5].time[0].elementValue[1].value;
			
			$("#feels-like").text(fl_1);
			
			
			
			//體感溫度 #temp #day2-high-low, day3-high-low, day4-high-low
			
			var T_1 = arr.records.locations[0].location[0].weatherElement[2].time[0].elementValue[0].value;
			
			$("#temp").text(T_1+ "°C");
			
			var T_2 = arr.records.locations[0].location[0].weatherElement[2].time[4].elementValue[0].value;
			var T_3 = arr.records.locations[0].location[0].weatherElement[2].time[8].elementValue[0].value;
			var T_4 = arr.records.locations[0].location[0].weatherElement[2].time[12].elementValue[0].value;
			var T_5 = arr.records.locations[0].location[0].weatherElement[2].time[16].elementValue[0].value;
			var T_6 = arr.records.locations[0].location[0].weatherElement[2].time[20].elementValue[0].value;
			
			$("#day2-high-low").text(T_1+ "°C");
			$("#day3-high-low").text(T_2+ "°C");
			$("#day4-high-low").text(T_3+ "°C");
			$("#day5-high-low").text(T_4+ "°C");
			$("#day6-high-low").text(T_5+ "°C");
			$("#day7-high-low").text(T_6+ "°C");
			
			
			
			//降雨機率 #day2-precip, day3-precip, day4-precip
			var rain_1 = arr.records.locations[0].location[0].weatherElement[0].time[0].elementValue[0].value;
			$("#day2-precip").text(rain_1 + "%");
			
			var rain_2 = arr.records.locations[0].location[0].weatherElement[0].time[1].elementValue[0].value;
			var rain_3 = arr.records.locations[0].location[0].weatherElement[0].time[2].elementValue[0].value;
			var rain_4 = arr.records.locations[0].location[0].weatherElement[0].time[3].elementValue[0].value;
			var rain_5 = arr.records.locations[0].location[0].weatherElement[0].time[4].elementValue[0].value;
			var rain_6 = arr.records.locations[0].location[0].weatherElement[0].time[5].elementValue[0].value;

			$("#day3-precip").text(rain_2 + "%");
			$("#day4-precip").text(rain_3 + "%");
			$("#day5-precip").text(rain_4 + "%");
			$("#day6-precip").text(rain_5 + "%");
			$("#day7-precip").text(rain_6 + "%");
			
			
		})
		.fail(function() {
			console.log("Get Taiwan weather fail!");
		})
		.always(function() {
			// console.log("Get Taiwan weather complete.");
		});
	}
	
	/*
	
	//華氏攝氏轉換 Celsius & Fahrenheit conversion function
	function C2F(c_degree) {
		var f_degree = Math.round(Number(c_degree) * 9 / 5 + 32);
		return f_degree;
	}
	
	function F2C(f_degree) {
		var c_degree = Math.round((Number(f_degree) - 32) * 5 / 9);
		return c_degree;
	}
	
	//#cbutton 將華氏轉攝氏
	$("#cbutton").click(function(event) {
		today_T_length = $("#temp").text().length;
		today_T = $("#temp").text().substring(0,today_T_length - 1);
		$("#temp").text(F2C(today_T) + "°");
	});//end cbutton
	
	//#fbutton 將攝氏轉華氏
	$("#fbutton").click(function(event) {
		today_T_length = $("#temp").text().length;
		today_T = $("#temp").text().substring(0,today_T_length - 1);
		$("#temp").text(C2F(today_T) + "°");
	});//end fbutton
	
	*/
	
});//end ready
