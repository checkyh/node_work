function [ Out ] = sortDis( In )
%UNTITLED4 此处显示有关此函数的摘要
%   此处显示详细说明
[row,col]=size(In);
for i=2:(row)
    for j=row:-1:i
        if In(j,2)<In(j-1,2)
            temp=zeros(1*2);
            temp=In(j,:);
            In(j,:)=In(j-1,:);
            In(j-1,:)=temp;
        end
    end
end
Out=In;
end

