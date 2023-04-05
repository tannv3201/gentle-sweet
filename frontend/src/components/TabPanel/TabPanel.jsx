export default function TabPanel({ children, value, index, ...props }) {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...props}
        >
            {value === index && children}
        </div>
    );
}
