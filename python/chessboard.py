def create_chessboard():
    board = []
    for i in range(8):
        row = []
        for j in range(8):
            if (i + j) % 2 == 0:
                row.append("██")  # Dark square
            else:
                row.append("  ")  # Light square
        board.append("".join(row))
    return "\n".join(board)

if __name__ == "__main__":
    print("Chessboard:")
    print(create_chessboard())
