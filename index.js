var memory_array = ['image1', 'image1', 'image2', 'image2', 'image3', 'image3', 'image4', 'image4', 'image5', 'image5', 'image6', 'image6', 'image7', 'image7', 'image8', 'image8', 'image9', 'image9', 'image10', 'image10', 'image11', 'image11', 'image12', 'image12', 'image13', 'image13', 'image14', 'image14', 'image15', 'image15']
        var memory_values = [];
        var memory_tile_ids = [];
        var tiles_flipped = 0;
        var counter = 0;

        //shuffle method var memory_tile_shuffle
        Array.prototype.memory_tile_shuffle = function () {
            var i = this.length, j, temp;
            while (--i > 0) {
                j = Math.floor(Math.random() * (i + 1));
                temp = this[j];
                this[j] = this[i];
                this[i] = temp;
            }
        }

        function newBoard() {
            tiles_flipped = 0;
            var output = '';
            var counter = 0;
            memory_array.memory_tile_shuffle();
            for (var i = 0; i < memory_array.length; i++) {
                output += '<div id="tile_' + i + '" onclick="memoryFlipTile(this, \'' + memory_array[i] + '\')"></div>';
            }
            document.getElementById('memory_board').innerHTML = output;
            document.getElementById('counterBoard').innerHTML = counter;
        }

        function memoryFlipTile(tile, val) {
            counter++;
            if (tile.innerHTML == "" && memory_values.length < 2) {
                tile.style.background = '#FFF';
                tile.innerHTML = '<img src="./images/' + val + '.png" style="height:70px; width:70px; position:center"/>';

                if (memory_values.length == 0) {
                    memory_values.push(val);
                    memory_tile_ids.push(tile.id);
                    document.getElementById('counterBoard').innerHTML = counter;
                } else if (memory_values.length == 1) {
                    document.getElementById('counterBoard').innerHTML = counter;
                    memory_values.push(val);
                    memory_tile_ids.push(tile.id);
                    if (memory_values[0] == memory_values[1]) {
                        tiles_flipped += 2;
                        //clear both arrays
                        memory_values = [];
                        memory_tile_ids = [];
                        //check to see if the whole board is cleared
                        if (tiles_flipped == memory_array.length) {
                            alert("Board cleared... generating new board");
                            document.getElementById('memory_board').innerHTML = "";
                            counter = 0;
                            newBoard();
                            
                        }
                    } else {
                        function flip2Back() {
                            //Flip the 2 tiles back over
                            var tile_1 = document.getElementById(memory_tile_ids[0]);
                            var tile_2 = document.getElementById(memory_tile_ids[1]);
                            tile_1.style.background = 'url(./images/images.png)';
                            tile_1.style.backgroundSize = 'cover';
                            tile_1.innerHTML = "";
                            tile_2.style.background = 'url(./images/images.png)';
                            tile_2.style.backgroundSize = 'cover';
                            tile_2.innerHTML = "";
                            //Clear both arrays
                            memory_values = [];
                            memory_tile_ids = [];
                        }
                        setTimeout(flip2Back, 800);

                    }
                }
            }
        }
