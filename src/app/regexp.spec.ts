var str = "http://octo.computerwebservices.net/reports#access_token=BtDuja2NLd2MDPEh&expires_in=86400&id_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2NvbXB3ZWJzZXJ2LmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw1ODRiM2RkYWRmZjYzMDY0NzA1NzU5YmIiLCJhdWQiOiIyejFYZDNJM2dJSW95NkRDVHZvZzBlNGh6N1ZOQm83MSIsImV4cCI6MTQ5MDA1Njc5MiwiaWF0IjoxNDkwMDIwNzkyfQ.zTDsVMJtisidcBh_2KFfs3nA92AeodUK209LsB6Lqqw&token_type=Bearer";
var patt = new RegExp(/access_token|id_token|error/);
var res = patt.test(str);

it('REG EXPRESSION: should return true.', () => {
	expect(res).toBe(true);
});
it ('REGEXPRESSion: should give correct part',() => {
	let subs=str;
	let x = subs.indexOf("#");
	if (x > -1) 
		subs=subs.substr(x,subs.length-x);
     console.log(subs);
	expect (subs).toBe('#access_token=BtDuja2NLd2MDPEh&expires_in=86400&id_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2NvbXB3ZWJzZXJ2LmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw1ODRiM2RkYWRmZjYzMDY0NzA1NzU5YmIiLCJhdWQiOiIyejFYZDNJM2dJSW95NkRDVHZvZzBlNGh6N1ZOQm83MSIsImV4cCI6MTQ5MDA1Njc5MiwiaWF0IjoxNDkwMDIwNzkyfQ.zTDsVMJtisidcBh_2KFfs3nA92AeodUK209LsB6Lqqw&token_type=Bearer');
});
	
