//Reading the File
var readline = require('readline');
var fs = require('fs');
var path=require("path");
var flag=true;
var header=[];
var json = [];
var start,end;
var row=["All ages","Total"];
var read = readline.createInterface({
input: fs.createReadStream('csv/final.csv')
});
//Reading the file line by line
read.on('line',function(line){
     fun(line);     
});
//Closing CSV file 
read.on("close",function()
{
    var final=[];
    var x=start;
    for(let i=0;i<json[0].length;i++)
    {
        var tmp={};
        tmp["catogories"]=header[x].substring(20,header[x].length);
        tmp["population"]=json[0][i];
         final.push(tmp);
         x+=3;
    }
    //Output file path
    var outPath = path.join(__dirname, 'json/data3.json');
    // Convert object to string, write json to file
    fs.writeFileSync(outPath, JSON.stringify(final), 'utf8', 
        function(err){console.log(err);});
});
function fun(line)
{
    if(flag)
     {
       header=line.split(",");
       flag=false;
     }
     else
     {
        var tempArr=[]; 
        var row = line.split(",");
         for(var i = 0; i < header.length; i++)
            if(header[i]=="Educational level - Liate without educational level - Persons")
                start=i;
         else if(header[i]=="Educational level - Unclassified - Persons") 
                end=i;

        if(row[5]==row[0] && row[4]==row[1])
        {
            for(let row_i = start; row_i <= end; row_i+=3)
               tempArr.push(parseInt(row[row_i]));
        // Add object to list 
            if(json.length!=0)
                for(let j=0;j<tempArr.length;j++)
                    json[0][j]=json[0][j]+tempArr[j];
            else
            json.push(tempArr);
        }
      }
  }