function [ result ] = distance( one,two )
%DISTANCE 此处显示有关此函数的摘要
%  输入是两个均值向量，输出是距离标量
result=0;
    for i=1:45
       result=result+(one(i)-two(i))^2;
    end
    
end

