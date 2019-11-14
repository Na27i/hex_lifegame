# hex_lifegame
Life game run in a web browser.

## specification

1. survival conditions

    Next generation cell status against the number of cells facing the current cell.
    0 indicates that the cell is dead, 1 indicates that the cell is alive.

    <table>
        <tr>
            <th></th>
            <th colspan=6>Number of adjacent cells</th>
        </tr>
        <tr>
            <th>sell state</th>
            <th>1</th>
            <th>2</th>
            <th>3</th>
            <th>4</th>
            <th>5</th>
            <th>6</th>
        </tr>
        <tr>
            <td align="center">0</td>
            <td align="center">0</td>
            <td align="center">1</td>
            <td align="center">1</td>
            <td align="center">0</td>
            <td align="center">0</td>
            <td align="center">0</td>
        </tr>
        <tr>
            <td align="center">1</td>
            <td align="center">0</td>
            <td align="center">1</td>
            <td align="center">1</td>
            <td align="center">1</td>
            <td align="center">0</td>
            <td align="center">0</td>
        </tr>
    </table>

2. boundary condition
  
   Do not set.