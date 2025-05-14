import moment from 'moment'

// 格式化时间
export const formatDate = (date : number, format = 'YYYY/MM/DD HH:mm:ss') => {
	if (!date) return date;
	return moment(date).format(format);
};