function [ Out ] = sortDis( In )
%UNTITLED4 �˴���ʾ�йش˺�����ժҪ
%   �˴���ʾ��ϸ˵��
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

