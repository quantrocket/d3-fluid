export default function (x, y) {
    if (arguments.length === 2)
        return `translate(${x}, ${y})`;
    else
        return `translate(${x})`;
}
