import './style.scss';

export default function CardCategory({ title, color }) {
    return (
        <div className="horizontal-align gap1 ai-center">
            <div className="color-dot"
                style={{ backgroundColor: color }}
            ></div>
            <span className="list-item__title">{title}</span>
        </div>
    );
}