function lotteryNum() {
	return (Math.round(Math.random() * 100) % 58) + 1;
}

function pickNumber(){
	let tmp = luckyLotteryNumbers
	console.log({ luckyLotteryNumbers })
	tmp.push(lotteryNum())
	tmp.sort()
	luckyLotteryNumbers = tmp
}

var luckyLotteryNumbers = [];

for (var i = 0; i < 6; i++) {
	luckyLotteryNumbers = pickNumber(Object.freeze(luckyLotteryNumbers));
}

console.log(luckyLotteryNumbers);
