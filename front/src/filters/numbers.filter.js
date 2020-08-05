export default function numbers (value) {
    return new Intl.NumberFormat('en-US').format(value)
}