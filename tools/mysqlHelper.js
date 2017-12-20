const mysqlM = require('mysql-magic');
const db_conf = require("../config/db");

mysqlM.initPool('otcdb', db_conf.mysql);

async function runMulty(sqls){
        const _db = mysqlM.getPool('otcdb');
        const con = await _db.getConnection();
		var querys = [];

        var res = [];
        var i;

		if(typeof(sqls) == "string"){
			querys.push(sqls);
		}

        for(i = 0; i < querys.length; i++){
                const [result] = await con.query(querys[i]);
                res.push(result);
        }

        await con.release();
        return res;
}

async function run(sqls){
        const _db = mysqlM.getPool('otcdb');
        const con = await _db.getConnection();
		var querys = [];

        var res = [];
        var i;

		if(typeof(sqls) == "string"){
			querys.push(sqls);
		}

        for(i = 0; i < querys.length; i++){
                const [result] = await con.query(querys[i]);
                res.push(result);
        }

        await con.release();
        return res;
}


module.exports.query = run;
module.exports.queryMulty = runMulty;

/*
async function run2(){

	let date = new Date();
	let year = date.getFullYear();
	let mon = date.getMonth() + 1;

	console.log(year, mon);

	let ret = await run("select * from huobi.trade_" + year + mon);
	console.log(ret[0][0]);
	process.exit(0);
}

run2();
*/
