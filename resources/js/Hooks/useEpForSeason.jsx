import debounce from "lodash.debounce";
import { useRef, useEffect, useMemo } from "react";

export function useEpForSeason(season, seasonList) {
    const [epSeason, setEpSeason] = useState(0);

    setEpSeason(seasonList[season]);
    return epSeason;
}
