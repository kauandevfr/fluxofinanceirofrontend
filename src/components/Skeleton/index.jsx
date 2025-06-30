import './style.scss';

export default function Skeleton() {
    return (
        <div className="skeleton w100 p1 br horizontal-align jc-end">
            <span className="text-2xl text-gray-500">Carregando...</span>
        </div>
    );
}