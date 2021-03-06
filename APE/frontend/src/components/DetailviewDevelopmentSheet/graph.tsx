import * as React from "react";
import "./graph.css";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from "recharts";

//http://recharts.org/en-US/api/XAxis#minTickGap
interface Props {
  ist_werte_trainee?: string[];
  ist_werte_trainer?: string[];
  soll_werte: string[];
  kriterien: string[];
  isOutfilledDevSheet: boolean;
}

export const Graph = (props: Props) => {
  const {
    ist_werte_trainee,
    ist_werte_trainer,
    soll_werte,
    kriterien,
    isOutfilledDevSheet
  } = props;

  const SimpleLineChart = () => {
    //<Tooltip/>, <Text width={1000}/>  window.innerWidth
    //          margin={{ top: 20, right: window.innerWidth / 3, left: 10, bottom: 5 }}>
    //margin={{ right: window.innerWidth / 3}}
    //                payload={[{ value: 'Istwerte', type: 'line', id: 'ID01' }, { value: 'Sollwerte', type: 'line', id: 'ID01' }]}
    var x_width = window.innerWidth / 1.5; //2 and 3
    return (
      <div id="div-graph-font">
        <LineChart
          layout="vertical"
          width={x_width}
          height={300}
          data={createData(kriterien, ist_werte_trainee, ist_werte_trainer, soll_werte)}>
          <Legend verticalAlign="top" height={36} />
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            datakey="x"
            ticks={["in vollem Maße", "weitgehend", "teilweise", "unzureichend", "nicht"]}
            type="category"
          />
          <YAxis dataKey="name" type="category" width={x_width / 2} />

          <Line
            dataKey="a"
            label={false}
            dot={false}
            activeDot={false}
            isAnimationActive={false}
            stroke="#FFFFFF"
            opacity="1"
            legendType="none"
          />
          <Line
            dataKey="b"
            label={false}
            dot={false}
            activeDot={false}
            isAnimationActive={false}
            stroke="#FFFFFF"
            opacity="0"
            legendType="none"
          />
          <Line
            dataKey="c"
            label={false}
            dot={false}
            activeDot={false}
            isAnimationActive={false}
            stroke="#FFFFFF"
            opacity="0"
            legendType="none"
          />
          <Line
            dataKey="d"
            label={false}
            dot={false}
            activeDot={false}
            isAnimationActive={false}
            stroke="#FFFFFF"
            opacity="0"
            legendType="none"
          />
          <Line
            dataKey="e"
            label={false}
            dot={false}
            activeDot={false}
            isAnimationActive={false}
            stroke="#FFFFFF"
            opacity="0"
            legendType="none"
          />
          {isOutfilledDevSheet && (
            <Line
              dataKey="Ausbilder"
              stroke="#992221"
              strokeWidth={6}
              dot={{ strokeWidth: 6, r: 6 }}
            />
          )}
          {isOutfilledDevSheet && (
            <Line
              dataKey="Auszubildender"
              stroke="#00beff"
              strokeWidth={4}
              dot={{ strokeWidth: 4, r: 4 }}
            />
          )}
          <Line dataKey="Soll" stroke="#43a047" strokeWidth={2} dot={{ strokeWidth: 2, r: 2 }} />
        </LineChart>
      </div>
    );
  };

  function createData(kriterien, ist_werte_trainee, ist_werte_trainer, soll_werte) {
    var data = [{}];
    for (var i = 0; i < kriterien.length; i++) {
      if (isOutfilledDevSheet) {
        data.push({
          name: kriterien[i],
          Auszubildender: ist_werte_trainee[i],
          Ausbilder: ist_werte_trainer[i],
          Soll: soll_werte[i]
        });
      } else {
        data.push({ name: kriterien[i], Soll: soll_werte[i] });
      }
    }
    data.push({
      name: "",
      a: "in vollem Maße",
      b: "weitgehend",
      c: "teilweise",
      d: "unzureichend",
      e: "nicht"
    });
    return data;
  }

  return (
    <div>
      <SimpleLineChart />
    </div>
  );
};
