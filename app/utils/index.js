//计算剩余天数
export const daysLeft = (deadline)=>{
    const difference = new Date(deadline).getTime() - Date.now();
    const remainingDays = Math.ceil(difference / (1000 * 3600 * 24));
    return remainingDays.toFixed(8);
}
//计算进度条百分比
export const calculateBarPercentage = (goal, raisedAmount) => {
    const percentage = Math.round((raisedAmount * 100) / goal);
    return percentage;
}
//检查图像是否存在
export const checkIfImage = (url,callback) => {
    const img = new Image();
    img.src = url;

    if(img.complete) callback(true);
    img.onload = () => callback(true);
    img.onerror = () => callback(false);
}