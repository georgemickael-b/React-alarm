class Utils{
  static days=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]

  static prependZero(num){
    num=(num > 9) ? num : "0"+num
    return num
  }

  static getDate12(){
      var date=new Date,
          hour=date.getHours(),
          minute=date.getMinutes(),
          ampm=hour >= 12 ? "PM" : "AM"
      hour=hour % 12
      hour=(hour==0)   ? 12 : hour
      var day= this.days[date.getDay()]

      return {hour:hour,minute:minute,ampm:ampm,day:day}
    }

    static getTodayOrTomorrow(ampm,hour,minute){
      /*if input time is less than now return 'Tomorrow' else 'Today'*/
      var now=Utils.getDate12()
      var dummyDate="2106/11/13"
      var dateStr =dummyDate+" "+hour+":"+minute+" "+ampm
      var dateNowStr =dummyDate+" "+now.hour+":"+now.minute+" "+now.ampm
      var date= new Date(dateStr)
      var dateNow= new Date(dateNowStr)
      if(date<dateNow)
        return "Tomorrow"
      else
        return "Today"
    }
}

export default Utils
