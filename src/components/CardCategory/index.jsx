import { useEffect } from 'react';
import './style.scss';

export default function CardCategory({ title, color, onClick, active, clickable }) {
    return (
        <div className="horizontal-align gap1 ai-center" onClick={onClick}

            style={{ opacity: active ? ".5" : "1", cursor: clickable === true ? 'pointer' : '' }}
        >
            <div className="color-dot"
                style={{ backgroundColor: color }}
            ></div>
            <span className="list-row__title">{title}</span>
        </div>
    );
}