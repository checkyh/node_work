function [ avarage ] = avar( filename1 )
%AVAR 此处显示有关此函数的摘要
%   输入是特征矩阵的txt文件，输出是特征向量均值
    fid=fopen(filename1,'r');
    tline=fgetl(fid);
    cells=str2num(fgetl(fid));
    lines=str2num(fgetl(fid));
    for i=1:lines
        tline=fgetl(fid);
        temp=regexp(tline,' ','split');
        for j=1:cells  
            if(j~=cells)
            c(i,j)=str2double(temp(6+j));
            else
                 c(i,j)=0;
            end
        end
    end

    for j=1:cells
        avarage(j)=0;
        for i=1:lines
            avarage(j)=avarage(j)+c(i,j);
        end
        avarage(j)=avarage(j)/lines;
    end


