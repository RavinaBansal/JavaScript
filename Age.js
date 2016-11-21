//Reading the File
var readline = require('readline');
var fs = require('fs');
var path=require("path");
var flag=true;
var header=[];
var arr = [];
var checkRow=["Total"];
var read = readline.createInterface({
input: fs.createReadStream('csv/final.csv')
});

//Reading the file line by line
read.on('line',function(line){
    fun(line);
  });

read.on("close",function()
{
	arr.shift();
  var final=[];
for(var age in arr)
{
    var tmp={};
    tmp["AgeGroup"]=arr[age][0];
    tmp["LiteratePerson"]=arr[age][1];
    final.push(tmp);
}

//Output file path
var outPath = path.join(__dirname, 'json/data1.json');
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
       if(row[4]==checkRow[0])
        {
          for(let i = 0; i < header.length; i++)
            if(header[i]=="Age-group")
              tempArr.push(row[i]);
         else if(header[i]=="Literate - Persons") 
              tempArr.push(parseInt(row[i]));
        // Add object to list 
            if(arr.length!=0)
            {
                let check=0;
                let index=-1;
                for(let j=0;j<arr.length;j++)
                {
                    if(arr[j].includes(tempArr[0])==true)
                    { 
                        check=1;
                        index=j;
                        break;
                    }
                }
                if(check==1)
                    arr[index][1]=arr[index][1]+tempArr[1];
                else
                  arr.push(tempArr);  
            }
            else
            arr.push(tempArr);
      }
    }
  }