import { notification } from 'antd';
import moment from 'moment';

// send notification
type NotificationType = 'success' | 'info' | 'warning' | 'error';

export const Notification = (status: NotificationType, msg: any) => {
    if (status !== 'error') {
        notification[status]({
            message: 'Thông báo',
            description: msg,
        });
    } else {
        notification[status]({
            message: 'Thông báo',
            description: msg,
        });
    }
};

// moment time to DD/MM/YYYY or ...'
export const momentToStringDate = (date: string | Date, type = 'date') => {
    switch (type) {
        case 'date':
            return date ? moment(date).utc().format('DD/MM/YYYY') : '';
        case 'dateTime':
            return moment(date).utc().format('HH:mm DD/MM/YYYY');
        case 'time':
            return moment(date).utc().format('HH:mm');
        default:
            return '';
    }
};
export const currencyFormat = (number: number) => {
    return number?.toString()?.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
};
// create function format number 100000 to 100.000

// cover DD/MM/YYYY to YYYY-MM-DD
export const getDateFormat = (date: any) => {
    return date.split('/').reverse().join('-');
};

// check all field value empty in object
export const checkEmptyAllFieldInObject = (obj: any) => {
    return Object.values(obj).every((x) => x || x === 0);
};

// generator uuid
export function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
            v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

// function download file cannot open blank page
export const downloadFile = (fileLink: string) => {
    fetch(fileLink, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/pdf',
        },
    })
        .then((response) => response.blob())
        .then((blob) => {
            // Create blob link to download
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link: any = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileLink.slice(fileLink.lastIndexOf('/') + 1));

            // Append to html link element page
            document.body.appendChild(link);

            // Start download
            link.click();
            // Clean up and remove the link
            link.parentNode.removeChild(link);
        });
};
export const handleObjectEmpty = (obj: any) => {
    const cloneObj = { ...obj };

    // remove key from object value empty
    for (const key in cloneObj) {
        if (Object.prototype.hasOwnProperty.call(cloneObj, key)) {
            const element = cloneObj[key];
            if (element === '' || element === null) delete cloneObj[key];
        }
    }
    return cloneObj;
};
// format size file
export function formatBytes(bytes: number, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// timing wait
export const wait = (timeout: number) => {
    return new Promise((resolve: any) => setTimeout(resolve, timeout));
};

// flat duplicate id in array
export const removeDuplicateIdInArray = (arr: any) => {
    const filteredArr = arr.reduce((acc: any, current: any) => {
        const x = acc.find((item: any) => item.id === current.id);
        if (!x) {
            return acc.concat([current]);
        } else {
            return acc;
        }
    }, []);

    return filteredArr;
};

// check now
export const checkNowDate = (date: string) => {
    const dateNow = moment().format('YYYY-MM-DD');
    const timeNow = moment().format('HH:mm');
    const dateCompare = momentParseUtc(date).format('YYYY-MM-DD');
    const timeCompare = momentParseUtc(date).format('HH:mm');
    // split timeCompare into hour and minute
    const timeCompareSplit = timeCompare.split(':');
    const timeSplit = timeNow.split(':');

    if (dateNow === dateCompare) {
        if (timeCompareSplit[0] < timeSplit[0]) {
            return true;
        }

        if (timeCompareSplit[0] === timeSplit[0]) {
            if (timeCompareSplit[1] < timeSplit[1]) {
                return true;
            }
        }
    }
    return false;
};

// check now start voucher date
export const checkNowStartVoucherDate = (date: string) => {
    const dateNow = moment().format('YYYY-MM-DD');
    const timeNow = moment().format('HH:mm');
    const dateCompare = momentParseUtc(date).format('YYYY-MM-DD');
    const timeCompare = momentParseUtc(date).format('HH:mm');
    // split timeCompare into hour and minute
    const timeCompareSplit = timeCompare.split(':');
    const timeSplit = timeNow.split(':');

    if (dateNow === dateCompare) {
        if (timeCompareSplit[0] > timeSplit[0]) {
            return true;
        }

        if (timeCompareSplit[0] === timeSplit[0]) {
            if (timeCompareSplit[1] > timeSplit[1]) {
                return true;
            }
        }
    }
    return false;
};

// moment parse utc
export const momentParseUtc = (date: string) => {
    return moment(date).utc();
};

// move array

export function arrayMoveMutable(array: any, fromIndex: any, toIndex: any) {
    const startIndex = fromIndex < 0 ? array.length + fromIndex : fromIndex;

    if (startIndex >= 0 && startIndex < array.length) {
        const endIndex = toIndex < 0 ? array.length + toIndex : toIndex;

        const [item] = array.splice(fromIndex, 1);
        array.splice(endIndex, 0, item);
    }
}

export function arrayMoveImmutable(array: any, fromIndex: any, toIndex: any) {
    const newArray = [...array];
    arrayMoveMutable(newArray, fromIndex, toIndex);
    return newArray;
}
