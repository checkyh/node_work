function [ result ] = distance( one,two )
%DISTANCE �˴���ʾ�йش˺�����ժҪ
%  ������������ֵ����������Ǿ������
result=0;
    for i=1:45
       result=result+(one(i)-two(i))^2;
    end
    
end

