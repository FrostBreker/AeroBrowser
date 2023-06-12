export const dateParser = (num) => {
    return new Date(num ? Date.parse(num) : Date.now()).toLocaleDateString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
    }).toString();
};

export const generateId = () => {
    const list = "ABCDEFGHIJKLMNPQRSTUVWXYZ123456789";
    var res = "";
    for (var i = 0; i < 12; i++) {
        var rnd = Math.floor(Math.random() * list.length);
        res = res + list.charAt(rnd);
    }
    return res;
};

export const timestampParser = (num) => {

};

export const isEmpty = (value) => {
    return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
    );
};

export const loadTheme = (d) => {
    const root_theme = document.querySelector(":root");
    Object.keys(d.items).forEach((key) => {
        Object.keys(d.items[key]).forEach((k) => {
            root_theme.style.setProperty(`--${k}`, d.items[key][k]);
        });
    });
}