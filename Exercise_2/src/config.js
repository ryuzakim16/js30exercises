class Clock{
	constructor(hour, minute){
		this.hour = hour;
		this.minute = minute;
	}
	get hourDeg(){
		return this.hour * 30;
	}
	get minuteDeg(){
		return this.minute * 6;
	}
}

export default Clock;