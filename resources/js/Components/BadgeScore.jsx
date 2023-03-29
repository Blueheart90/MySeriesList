import StarIcon from "./svg/StarIcon";

const BadgeScore = ({ score, max = 10 }) => {
    return (
        <div className="flex items-center gap-2 px-2 py-1 bg-secundary rounded-xl w-fit">
            <StarIcon className="w-6 stroke-amber-500" />
            <p className="text-sm rounded-xl w-fit bg-secundary">{`Puntuación: ${score}/${max}`}</p>
        </div>
    );
};

export default BadgeScore;
