function [ avarage ] = avar( filename1 )
%AVAR �˴���ʾ�йش˺�����ժҪ
%   ���������������txt�ļ������������������ֵ
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


