export default function getDate(s) {
    if (s) {
        return new Date(s.replace(/-/g, '\/'))
    }
};
