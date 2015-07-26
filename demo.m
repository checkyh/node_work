fid=fopen('input.txt'); 
fileNumber=fscanf(fid,'%d'); 
for i=1:fileNumber
    fileName{i} = fgetl(fid); 
end
fclose(fid); 

for i=1:fileNumber

    cmd = '.\x86_64-win-nvcc\colorDescriptor ';
    cmd=[cmd,fileName{i}];
    cmd=[cmd,' --detector densesampling --descriptor rgbhistogram --output '];
    cmd=[cmd,fileName{i},'.txt'];
    system(cmd);

    resultFileName=strcat(fileName{i},'.txt');
    resultAver(i,:)=avar(resultFileName);

   
    file_i=strcat(num2str(i),'.tsv');
    nowpath=strcat('./public/tsv/',file_i);
    
    fid=fopen(nowpath,'w+');
     fprintf(fid,'letter\tfrequency\n');
    for j=1:length(resultAver(i,:))
        fprintf(fid,'%d\t%f\n',j,resultAver(i,j));
    end
    fclose(fid);
end

% sort
disResult=zeros(fileNumber,2);
for t=1:fileNumber
    disResult(t,1)=t;
end

for i=2:fileNumber
    disResult(i,2)=distance(resultAver(1,:),resultAver(i,:));
end

sortResult=sortDis(disResult);

fid=fopen('./public/sort.txt','w+');
for i=1:length(sortResult(:,1))
       fprintf(fid,'%d ',sortResult(i,1));
end
fclose(fid);


